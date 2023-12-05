"use client";

import { useState, useRef } from "react";

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
      child.style.backgroundColor = "purple";
      child.style.position = "absolute";
      child.className = "drop-and-fade";
      child.style.zIndex = "-1";
      childRef.current?.appendChild(child);
      last.current = {
        x: event.clientX,
        y: event.clientY,
        created: new Date(),
      };

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
