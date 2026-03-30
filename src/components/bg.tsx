"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: { color: { value: "transparent" } }, // Фон прозрачный, чтобы работал твой CSS
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" }, // Линии тянутся к курсору
          },
          modes: {
            grab: { distance: 140, links: { opacity: 1 } },
          },
        },
        particles: {
          color: { value: "#000" }, // Цвет точек (например, твой primary синий)
          links: {
            color: "#000",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1, // Медленное плавное движение
            direction: "none",
            outModes: { default: "out" },
          },
          number: { value: 160, density: { enable: true } },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-20" // Уводим на задний план
    />
  );
};
