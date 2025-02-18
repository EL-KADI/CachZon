import { useEffect } from "react";

export default function Offers() {
  const gradientBackgroundStart = "rgb(0, 0, 0)";
  const gradientBackgroundEnd = "rgb(25, 25, 25)";
  const firstColor = "0, 0, 0";
  const secondColor = "20, 20, 20";
  const thirdColor = "30, 30, 30";
  const fourthColor = "40, 40, 40";
  const fifthColor = "50, 50, 50";
  const pointerColor = "10, 10, 10";
  const size = "80%";
  const blendingValue = "hard-light";

  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);
  return (
    <>
      <div className="bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] min-h-screen flex justify-center items-center p-4">
        <div className="max-w-sm sm:max-w-2xl mx-auto text-center">
          <h2 className="text-3xl bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-serif">
            Soon
          </h2>
        </div>
      </div>
    </>
  );
}
