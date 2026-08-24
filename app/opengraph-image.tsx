import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "@/lib/logoMarkPaths";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
                    width={520}
                    height={279}
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
