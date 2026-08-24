import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "@/lib/logoMarkPaths";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000",
                }}
            >
                <svg
                    width={110}
                    height={59}
                    viewBox={LOGO_MARK_VIEW_BOX}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {LOGO_MARK_PATHS.map((d) => (
                        <path key={d} d={d} fill="#fff" />
                    ))}
                </svg>
            </div>
        ),
        size,
    );
}
