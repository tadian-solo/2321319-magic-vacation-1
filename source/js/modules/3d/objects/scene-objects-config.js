import * as THREE from "three";
import { SvgShape, ThemeColor, Screen, ObjectColor, MaterialType } from "../../../general/consts";
import { getLathePointsBy } from "./helpers";
import RoadMaterial from "../materials/road-material";
import CarpetMaterial from "../materials/carpet-material";

export const SceneObjects = {
  [Screen.TOP]: {
    backgroundImage: `img/module-5/scenes-textures/scene-0.png`,
    primitives: [
      {
        groupId: `plane`,
        position: [0, 0, 10],
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        children: [
          {
            id: `planeMain`,
            primitiveType: `PlaneGeometry`,
            primitiveSettings: [100, 100],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.BASIC.id,
            materialProps: {
              color: ObjectColor.PURPLE.id,
            }
          },
        ],
      },
    ],
    svgShapes: [
      {
        id: SvgShape.FLAMINGO.id,
        position: [-150, 150, 50],
        scale: [0.6, 0.6, 0.6],
        rotation: [0, 0, 180],
        extrudeSettings: { bevelOffset: -2 },
        materialType: MaterialType.SOFT.id,
        materialProps: {
          color: ObjectColor.LIGHT_DOMINANT_RED.id,
        }
      },
      {
        id: SvgShape.SNOWFLAKE.id,
        position: [-190, -40, 50],
        scale: [1, 1, 1],
        rotation: [0, 0, 180],
        extrudeSettings: { bevelOffset: -2 },
        materialType: MaterialType.BASIC.id,
        materialProps: {
          color: ObjectColor.BLUE.id,
        }
      },
      {
        id: SvgShape.QUESTION.id,
        position: [20, -150, 50],
        scale: [0.8, 0.8, 0.8],
        rotation: [0, 180, 180],
        extrudeSettings: { bevelOffset: -2 },
        materialType: MaterialType.BASIC.id,
        materialProps: {
          color: ObjectColor.BLUE.id,
        }
      },
      {
        id: SvgShape.FLOWER.id,
        position: [290, 10, 100],
        scale: [0.2, 0.2, 1],
        rotation: [0, 0, 180],
        extrudeSettings: { depth: 4, bevelOffset: -2 },
        materialType: MaterialType.BASIC.id,
        materialProps: {
          color: ObjectColor.PURPLE.id,
        }
      },
      {
        id: SvgShape.KEYHOLE.id,
        position: [70, 70, 50],
        scale: [0.09, 0.09, 1],
        rotation: [0, 0, 180],
        extrudeSettings: { depth: 20, bevelOffset: -2 },
        materialType: MaterialType.SOFT.id,
        materialProps: {
          color: ObjectColor.DARK_PURPLE.id,
        }
      },
      {
        id: SvgShape.LEAF.id,
        position: [200, 200, 50],
        scale: [0.8, 0.8, 0.8],
        rotation: [0, 180, 180],
        extrudeSettings: { bevelOffset: -2 },
        materialType: MaterialType.BASIC.id,
        materialProps: {
          color: ObjectColor.GREEN.id,
        }
      },
      {
        id: SvgShape.LEAF.id,
        position: [150, 150, 50],
        scale: [0.8, 0.8, 0.8],
        rotation: [0, 180, 180],
        extrudeSettings: {
          depth: 3,
          bevelThickness: 3,
          bevelSize: 3,
          bevelOffset: -3,
        },
        materialType: MaterialType.BASIC.id,
        materialProps: {
          color: ObjectColor.GREEN.id,
        }
      },
    ],
  },
  [ThemeColor.BLUE]: {
    backgroundImage: `./img/module-5/scenes-textures/scene-2.png`,
    svgShapes: [],
    primitives: [
      {
        groupId: `pyramid`,
        position: [-10, -35, 12],
        scale: [0.65, 0.45, 0.65],
        rotation: [10, 0, 0],
        children: [
          {
            id: `pyramidBody`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [0, 125, 280, 4, 1],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BLUE.id,
            }
          },
        ],
      },
      {
        groupId: `flashlight`,
        position: [185, -105, 20],
        scale: [0.5, 0.5, 0.5],
        rotation: [15, 10, 1],
        children: [
          {
            id: `bottomPartBody`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [16, 16, 120, 80, 1],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BLUE.id,
            }
          },
          {
            id: `bottomPartTop`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [16, 80, 80],
            position: [0, 60, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BLUE.id,
            }
          },
          {
            id: `centerPart`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [7, 7, 230, 80, 1],
            position: [0, 183, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BLUE.id,
            }
          },
          {
            id: `topPartBottom`,
            primitiveType: `BoxGeometry`,
            primitiveSettings: [37, 4, 37],
            position: [0, 298, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BLUE.id,
            }
          },
          {
            id: `topPartCenter`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [21, 17, 60, 4, 1],
            position: [0, 330, 0],
            scale: [1, 1, 1],
            rotation: [0, 45, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.LIGHT_BLUE.id,
            }
          },
          {
            id: `topPartTop`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [22.5, 28.5, 6, 4, 1],
            position: [0, 363, 0],
            scale: [1, 1, 1],
            rotation: [0, 45, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BLUE.id,
            }
          },
        ],
      },
    ],
  },
  [ThemeColor.LIGHT_PURPLE]: {
    backgroundImage: `./img/module-5/scenes-textures/scene-1.png`,
    primitives: [
      {
        groupId: `chandelier`,
        position: [30, 130, 0],
        scale: [0.5, 0.5, 0.5],
        rotation: [0, 0, 0],
        children: [
          {
            id: `chandelierLathe`,
            primitiveType: `LatheGeometry`,
            primitiveSettings: [
              getLathePointsBy(80, 40, 2).map((el) => new THREE.Vector2(...el)),
              35,
              0,
              2 * Math.PI
            ],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 18],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BRIGHT_PURPLE.id,
            }
          },
          {
            id: `chandelierBody`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [60, 80, 80],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.DOMINANT_RED.id,
            }
          },
          {
            id: `chandelierThread`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [1, 1, 1000],
            position: [0, 560, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.METAL_GREY.id,
            }
          },
          {
            id: `chandelierHanging`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [10, 80, 80],
            position: [0, 120, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.BRIGHT_PURPLE.id,
            }
          },
        ],
      },
      {
        groupId: `carpet`,
        position: [50, -130, -50],
        scale: [0.4, 0.4, 0.4],
        rotation: [0, -60, 60],
        children: [
          {
            id: `carpetLathe`,
            primitiveType: `LatheGeometry`,
            primitiveSettings: [
              getLathePointsBy(763, 180, 3).map((el) => new THREE.Vector2(...el)),
              12,
              THREE.Math.degToRad(16),
              THREE.Math.degToRad(74)
            ],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.CUSTOM.id,
            materialProps: {
              materialConstructor: CarpetMaterial,
              mainColor: ObjectColor.LIGHT_PURPLE.id,
              secondaryColor: ObjectColor.ADDITIONAL_PURPLE.id,
              textureFrequency: 3.5
            }
          }
        ],
      },
    ],
    svgShapes: [],
  },
  [ThemeColor.LIGHT_BLUE]: {
    backgroundImage: `./img/module-5/scenes-textures/scene-3.png`,
    primitives: [
      {
        groupId: `snowman`,
        position: [-62, -85, 25],
        scale: [0.45, 0.45, 0.45],
        rotation: [10, -45, 0],
        children: [
          {
            id: `snowBottom`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [75, 80, 80],
            position: [0, 65, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.STRONG.id,
            materialProps: {
              color: ObjectColor.SNOW_COLOR.id,
            }
          },
          {
            id: `snowTop`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [44, 80, 80],
            position: [0, 173, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.STRONG.id,
            materialProps: {
              color: ObjectColor.SNOW_COLOR.id,
            }
          },
          {
            id: `carrot`,
            primitiveType: `ConeGeometry`,
            primitiveSettings: [18, 75, 80],
            position: [45, 173, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, -90],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.ORANGE.id,
            }
          },
        ],
      },
      {
        groupId: `road`,
        position: [50, -130, -50],
        scale: [0.4, 0.4, 0.4],
        rotation: [0, -60, 60],
        children: [
          {
            id: `roadLathe`,
            primitiveType: `LatheGeometry`,
            primitiveSettings: [
              getLathePointsBy(732, 160, 3).map((el) => new THREE.Vector2(...el)),
              12,
              THREE.Math.degToRad(0),
              THREE.Math.degToRad(90)
            ],
            position: [0, 200, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.CUSTOM.id,
            materialProps: {
              materialConstructor: RoadMaterial,
              mainColor: ObjectColor.GREY.id,
              secondaryColor: ObjectColor.WHITE.id,
              textureFrequency: 4.0
            }
          }
        ],
      },
    ],
    svgShapes: [],
  },
  [ThemeColor.PURPLE]: {
    backgroundImage: `./img/module-5/scenes-textures/scene-4.png`,
    primitives: [
      {
        groupId: `chandelier`,
        position: [30, 130, 0],
        scale: [0.5, 0.5, 0.5],
        rotation: [0, 0, 0],
        children: [
          {
            id: `chandelierLathe`,
            primitiveType: `LatheGeometry`,
            primitiveSettings: [
              getLathePointsBy(80, 40, 2).map((el) => new THREE.Vector2(...el)),
              35,
              0,
              2 * Math.PI
            ],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 18],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.SHADOWED_BRIGHT_PURPLE.id,
            }
          },
          {
            id: `chandelierBody`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [60, 80, 80],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.SHADOWED_DOMIANT_RED.id,
            }
          },
          {
            id: `chandelierThread`,
            primitiveType: `CylinderGeometry`,
            primitiveSettings: [1, 1, 1000],
            position: [0, 560, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.METAL_GREY.id,
            }
          },
          {
            id: `chandelierHanging`,
            primitiveType: `SphereGeometry`,
            primitiveSettings: [10, 80, 80],
            position: [0, 120, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.SOFT.id,
            materialProps: {
              color: ObjectColor.SHADOWED_BRIGHT_PURPLE.id,
            }
          },
        ],
      },
      {
        groupId: `carpet`,
        position: [50, -130, -50],
        scale: [0.4, 0.4, 0.4],
        rotation: [0, -60, 60],
        children: [
          {
            id: `carpetLathe`,
            primitiveType: `LatheGeometry`,
            primitiveSettings: [
              getLathePointsBy(763, 180, 3).map((el) => new THREE.Vector2(...el)),
              12,
              THREE.Math.degToRad(16),
              THREE.Math.degToRad(74)
            ],
            position: [0, 0, 0],
            scale: [1, 1, 1],
            rotation: [0, 0, 0],
            materialType: MaterialType.CUSTOM.id,
            materialProps: {
              materialConstructor: CarpetMaterial,
              mainColor: ObjectColor.SHADOWED_LIGHT_PURPLE.id,
              secondaryColor: ObjectColor.SHADOWED_ADDITIONAL_PURPLE.id,
              textureFrequency: 3.5
            }
          }
        ],
      },
    ],
    svgShapes: [],
  },
};
