import Image from "next/future/image";

export default function ResolvedIcon({ icon, width = 32, height = 32, alt = "logo" }) {
  // direct or relative URLs
  if (icon.startsWith("http") || icon.startsWith("/")) {
    return (
      <Image
        src={`${icon}`}
        width={width}
        height={height}
        style={{
          width,
          height,
          objectFit: "contain",
        }}
        alt={alt}
      />
    );
  }

  // mdi- prefixed, material design icons
  if (icon.startsWith("mdi-")) {
    const iconName = icon.replace("mdi-", "").replace(".svg", "");
    return (
      <div
        style={{
          width,
          height,
          maxWidth: '100%',
          maxHeight: '100%',
          background: "linear-gradient(180deg, rgb(var(--color-logo-start)), rgb(var(--color-logo-stop)))",
          mask: `url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${iconName}.svg) no-repeat center / contain`,
          WebkitMask: `url(https://cdn.jsdelivr.net/npm/@mdi/svg@latest/svg/${iconName}.svg) no-repeat center / contain`,
        }}
      />
    );
  }

  // fallback to dashboard-icons
  const iconName = icon.replace(".png", "");
  return (
    <Image
      src={`https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/${iconName}.png`}
      width={width}
      height={height}
      style={{
        width,
        height,
        objectFit: "contain",
      }}
      alt={alt}
    />
  );
}
