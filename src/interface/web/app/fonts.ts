// import { Noto_Sans, Noto_Sans_Arabic } from "next/font/google";
//
// export const noto_sans = Noto_Sans({
//     subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "devanagari", "vietnamese"],
//     display: "swap",
//     variable: "--font-noto-sans",
// });
//
// export const noto_sans_arabic = Noto_Sans_Arabic({
//     subsets: ["arabic"],
//     display: "swap",
//     variable: "--font-noto-sans-arabic",
// });

import localFont from "next/font/local";

const noto_sans = localFont({
    src: [
        {
            path: "../public/fonts/noto/NotoSansSC-Thin.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-ExtraLight.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../public/fonts/noto/NotoSansSC-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-noto-sans-sc",
});
const noto_sans_arabic = localFont({
    src: [
        {
            path: "../public/fonts/Noto_Sans/static/NotoSans_SemiCondensed-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Noto_Sans/static/NotoSans_SemiCondensed-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Noto_Sans/static/NotoSans_SemiCondensed-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        // {
        //     path: "Noto_Sans/static/NotoSans_SemiCondensed-Bold.ttf",
        //     weight: "700",
        //     style: "normal"
        // },
        {
            path: "../public/fonts/Noto_Sans/static/NotoSans_SemiCondensed-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-noto-sans",
});

export { noto_sans, noto_sans_arabic };
