import { SVGProps } from "react";
import { AiFillVideoCamera } from "react-icons/ai";
import { BsCpu } from "react-icons/bs";
import { CgDrive } from "react-icons/cg";
import { FaLaptopCode, FaMicrochip } from "react-icons/fa";
import { FiHardDrive } from "react-icons/fi";
import {
    GiBatteryPackAlt,
    GiComputerFan,
    GiWaterRecycling,
    GiWeightCrush,
} from "react-icons/gi";
import { GrSystem } from "react-icons/gr";
import { MdOutlineCameraEnhance, MdStorage } from "react-icons/md";
import { SiAudioboom } from "react-icons/si";
import { TbFaceId } from "react-icons/tb";

export const techIcons: {
    [key: string]: { icon: SVGProps<SVGSVGElement> };
} = {
    audio: {
        icon: <SiAudioboom />,
    },
    camera: {
        icon: <MdOutlineCameraEnhance />,
    },
    battery: {
        icon: <GiBatteryPackAlt />,
    },
    capacity: {
        icon: <MdStorage />,
    },
    operatingSystem: {
        icon: <GrSystem />,
    },
    waterResistence: {
        icon: <GiWaterRecycling />,
    },
    display: {
        icon: <FaLaptopCode />,
    },
    chip: {
        icon: <FaMicrochip />,
    },
    weight: {
        icon: <GiWeightCrush />,
    },
    videoRecording: {
        icon: <AiFillVideoCamera />,
    },
    faceId: {
        icon: <TbFaceId />,
    },
    processor: {
        icon: <BsCpu />,
    },
    gpu: {
        icon: <GiComputerFan />,
    },
    ram: {
        icon: <CgDrive />,
    },
    hardDrive: {
        icon: <FiHardDrive />,
    },
};
