import throttle from 'lodash/throttle';
import {Screen} from "../general/consts";

const cssTransitionClass = `screen--background-transitioned`;

export default class PageRouter {
  constructor(screens) {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    const screenResultsElements = document.querySelectorAll(`.screen--result`);
    this.screenElements = [...screens, ...screenResultsElements];
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.transitionedBackground = document.querySelector(`.screen--background`);

    this.activeScreen = -1;
    this.prevScreen = -1;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);
    document.body.addEventListener(`toScreenResult`, this.toScreenResultHandler.bind(this));
    document.body.addEventListener(`fromScreenResult`, this.fromScreenResultHandler.bind(this));

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      const currentPosition = this.activeScreen;
      this.reCalculateActiveScreenPosition(evt.deltaY);
      if (currentPosition !== this.activeScreen) {
        this.prevScreen = currentPosition;
        if (this.isResultScreen(this.prevScreen)) {
          this.resetResultScreen(this.screenElements[this.prevScreen]);
        }
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    if (this.isResultScreen(this.prevScreen)) {
      this.resetResultScreen(this.screenElements[this.prevScreen]);
    }
    this.changePageDisplay();
  }

  toScreenResultHandler(e) {
    const nextScreenId = e.detail.screenId;
    this.prevScreen = this.activeScreen;
    if (this.isResultScreen(this.prevScreen)) {
      this.resetResultScreen(this.screenElements[this.prevScreen]);
    }
    this.activeScreen = nextScreenId;
    this.showScreenResult(this.screenElements[this.activeScreen]);

    const event = new CustomEvent(`screenResultChanged`, {
      detail: {
        'screenId': nextScreenId,
        'prevScreenId': e.detail.prevScreenId,
      }
    });
    document.body.dispatchEvent(event);
  }

  fromScreenResultHandler(e) {
    const nextScreenId = e.detail.screenId;
    this.prevScreen = this.activeScreen;
    this.resetResultScreen(this.screenElements[this.prevScreen]);
    this.activeScreen = nextScreenId;
    this.changePageDisplay();
  }

  isResultScreen(screenId) {
    return [Screen.RESULT, Screen.RESULT2, Screen.RESULT3].indexOf(screenId) !== -1;
  }

  resetResultScreen(screen) {
    screen.classList.remove(`screen--show`);
    screen.classList.remove(`screen--transitioned`);
    screen.classList.add(`screen--hidden`);
  }

  showScreenResult(screen) {
    screen.classList.add(`screen--show`);
    screen.classList.remove(`screen--hidden`);
    setTimeout(function () {
      screen.classList.add(`screen--transitioned`);
    }, 150);
  }

  changePageDisplay() {
    this.changeActiveMenuItem();
    this.replaceTransitionsForDisclaimer();
    this.runHiddenScreenTransition()
    .then(() => this.showTransitionedBackground())
    .then(() => {
      this.emitChangeDisplayEvent();
      this.changeVisibilityDisplay();
    });
  }

  runHiddenScreenTransition() {
    if (this.prevScreen === -1) {
      return new Promise((resolve, _reject) => resolve());
    }
    return new Promise((resolve, _reject) => {
      this.screenElements[this.prevScreen].classList.add(`screen--hidden-transitioned`);
      this.emitChangeDisplayEvent(`beforeScreenChanged`);
      setTimeout(() => {
        this.screenElements[this.prevScreen].classList.add(`screen--hidden`);
        this.screenElements[this.prevScreen].classList.remove(`screen--hidden-transitioned`);
        resolve();
      }, this.prevScreen === Screen.TOP ? 100 : 400);
    });
  }

  showTransitionedBackground() {
    return new Promise((resolve, _reject) => {
      const isShowBackground = [Screen.PRIZES, Screen.RULES, Screen.GAME].indexOf(this.activeScreen) !== -1
                              && [Screen.TOP, Screen.STORY].indexOf(this.prevScreen) !== -1;
      if (this.transitionedBackground && isShowBackground) {
        this.transitionedBackground.classList.add(cssTransitionClass);
        setTimeout(() => {
          this.transitionedBackground.classList.remove(cssTransitionClass);
          resolve();
        }, 500);
      } else {
        resolve();
      }
    });
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  replaceTransitionsForDisclaimer() {
    if (this.prevScreen === Screen.PRIZES && this.activeScreen === Screen.RULES) {
      const disclaimerPrizes = document.querySelector(`.screen--prizes .js-footer`);
      const disclaimerRules = document.querySelector(`.screen--rules .screen__disclaimer`);
      disclaimerPrizes.classList.add(`no-transform`);
      disclaimerRules.classList.add(`no-transform`);
      setTimeout(() => {
        disclaimerPrizes.classList.remove(`no-transform`);
        disclaimerRules.classList.remove(`no-transform`);
      }, 600);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent(eventName = `screenChanged`) {
    const event = new CustomEvent(eventName, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen],
        'prevScreenId': this.prevScreen,
        'prevScreenName': this.screenElements[this.prevScreen] && this.screenElements[this.prevScreen].id,
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(Screen.GAME, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, Math.min(Screen.GAME, --this.activeScreen));
    }
  }
}
