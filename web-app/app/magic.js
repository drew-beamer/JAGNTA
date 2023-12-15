"use client";

import { useRef } from "react";

function randomColor() {
   const index = Math.floor(Math.random() * 4)
   return ["#1d4ed8", "#3730a3", "#5b21b6", "#0ea5e9"][index]
}

export default function MagicContainer({ children }) {
  const last = useRef(null);
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const calcDistance = (currX, currY) => {
    const xDist = last.current.x - currX;
    const yDist = last.current.y - currY;
    return Math.sqrt(xDist * xDist + yDist * yDist);
  };

  const handleMouseMove = async (event) => {
    if (
      !last.current ||
      calcDistance(event.clientX, event.clientY) > 75 ||
      new Date() - last.current.created > 250
    ) {
      const child = document.createElement("span");
      child.key = new Date().getTime();
      child.style.left = event.clientX + "px";
      child.style.top = event.clientY + "px";
      child.style.borderRadius = "100%";
      child.style.width = "8px";
      child.style.height = "8px";
      child.style.backgroundColor = randomColor();
      child.style.position = "absolute";
      child.style.transform = "translateX(-50%)";
      child.className = "drop-and-fade";
      child.style.zIndex = "-1";
      childRef.current?.appendChild(child);
      last.current = {
        x: event.clientX,
        y: event.clientY,
        created: new Date(),
      };

      setTimeout(() => childRef.current?.removeChild(child), 1000);
    }
  };

  return (
    <div
      ref={parentRef}
      onMouseMove={handleMouseMove}
      className="w-full flex flex-col grow p-24">
      <div
        ref={childRef}
        className="absolute top-0 left-0 overflow-clip max-h-screen h-full w-full z-[-1]"></div>
      {children}
    </div>
  );
}
