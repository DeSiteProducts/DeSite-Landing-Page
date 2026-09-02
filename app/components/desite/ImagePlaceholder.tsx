import Image from "next/image";

export function ImagePlaceholder({
  label,
  path,
  priority = false,
  tall = false,
}: {
  label: string;
  path: string;
  priority?: boolean;
  tall?: boolean;
}) {
  const isRealImage = path.startsWith("/images/");
  if (isRealImage) {
    return (
      <figure
        className={`desite-image-frame ${tall ? "desite-image-frame-tall" : ""}`}
      >
        <Image
          src={path}
          alt={label}
          fill
          sizes="(max-width: 600px) calc(100vw - 100px), (max-width: 900px) 40vw, 20vw"
          priority={priority}
          quality={85}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </figure>
    );
  }

 
}
