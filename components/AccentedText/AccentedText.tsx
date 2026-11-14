type AccentedTextProps = {
    text: string;
    /** Character positions rendered in the script (Lacquer) font. */
    accentIndices: number[];
};

/**
 * The site's signature treatment: a few letters of an uppercase
 * Archivo text swapped for lowercase Lacquer.
 */
export function AccentedText({ text, accentIndices }: AccentedTextProps) {
    return text.split("").map((char, i) =>
        accentIndices.includes(i) ? (
            <span
                key={i}
                className="font-lacquer lowercase text-[1.167em] leading-[0.1]"
            >
                {char}
            </span>
        ) : (
            char
        ),
    );
}
