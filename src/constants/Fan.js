import {COLOR} from "./Color";
import bladeImageFan from './../assets/images/blade_fan.png';
import footImageFan from './../assets/images/foot_fan.png';

import bladeImageFanBlue from './../assets/images/blade_fan_blue.png';
import footImageFanBlue from './../assets/images/foot_fan_blue.png';

import bladeImageFanRed from './../assets/images/blade_fan_red.png';
import footImageFanRed from './../assets/images/foot_fan_red.png';
import {Image} from "react-native";

export const OBJECT = [
    {
        COLOR: COLOR.BLACK,
        BLADE: Image.resolveAssetSource(bladeImageFan).uri,
        FOOT: Image.resolveAssetSource(footImageFan).uri,
    },
    {
        COLOR: COLOR.BLUE,
        BLADE: Image.resolveAssetSource(bladeImageFanBlue).uri,
        FOOT: Image.resolveAssetSource(footImageFanBlue).uri,
    },
    {
        COLOR: COLOR.PINK,
        BLADE: Image.resolveAssetSource(bladeImageFanRed).uri,
        FOOT: Image.resolveAssetSource(footImageFanRed).uri,
    },
    {
        COLOR: COLOR.GREEN,
        BLADE: Image.resolveAssetSource(bladeImageFanRed).uri,
        FOOT: Image.resolveAssetSource(footImageFanRed).uri,
    },
]
