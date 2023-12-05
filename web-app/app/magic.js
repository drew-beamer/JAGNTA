"use client";

import { useState, useRef } from "react";

export default function MagicContainer({ children }) {
  const [last, setLast] = useState(null);
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const calcDistance = (currX, currY) => {
    const xDist = (last.x - currX);
    const yDist = (last.y - currY);
    return Math.sqrt(xDist*xDist + yDist*yDist);
  }
    

  const handleMouseMove = (event) => {
    if (!last || calcDistance(event.clientX, event.clientY) > 25 || new Date() - last.created > 250) {
      const child = document.createElement("span");
      child.style.left = event.clientX + "px";
      child.style.top = event.clientY + "px";
      child.style.borderRadius = "100%";
      child.style.width = "5px";
      child.style.height = "5px";
      child.style.backgroundColor = "purple";
      child.style.position = "absolute";
      child.className = "drop-and-fade";
      child.style.zIndex = "-1";
      childRef.current?.appendChild(child);
      setLast({ x: event.clientX, y: event.clientY, created: new Date() });
      setTimeout(() => childRef.current?.removeChild(child), 750);
    }
  };

  return (
    <div
      ref={parentRef}
      onMouseMove={handleMouseMove}
      className="w-full flex flex-col grow p-24">
      <div
        ref={childRef}
        className="absolute top-0 left-0 h-full w-full z-[-1]"></div>
      {children}
    </div>
  );
}
