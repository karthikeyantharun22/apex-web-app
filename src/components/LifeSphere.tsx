"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DomainScore, LifeDomain } from "@/lib/types";
import { Sparkles, Compass, ShieldCheck, Activity, Bot } from "lucide-react";

interface LifeSphereProps {
  domainScores: DomainScore[];
  selectedDomain: LifeDomain | "all";
  onSelectDomain: (domain: LifeDomain | "all") => void;
  isAgentThinking?: boolean;
}

const DOMAIN_COLORS: Record<LifeDomain, number> = {
  body: 0xf43f5e, // Crimson Calisthenics
  style: 0xf59e0b, // Amber Wardrobe
  communication: 0xa855f7, // Violet Negotiation
  finance: 0x10b981, // Emerald Wealth
  knowledge: 0x00f2fe, // Cyan Mastery
  habits: 0x38bdf8, // Sky Blue Telemetry
};

export const LifeSphere: React.FC<LifeSphereProps> = ({
  domainScores,
  selectedDomain,
  onSelectDomain,
  isAgentThinking = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDomain, setHoveredDomain] = useState<DomainScore | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Group containing entire 3D galaxy & neural sphere
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Dynamic Geodesic Neural Lattice
    const sphereGeo = new THREE.IcosahedronGeometry(2.3, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframeMesh = new THREE.Mesh(sphereGeo, wireframeMat);
    sphereGroup.add(wireframeMesh);

    // 2. High-Tech Particle Dust Galaxy
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Neon cyan & purple gradient particles
      colors[i] = Math.random() > 0.5 ? 0.0 : 0.6;
      colors[i + 1] = Math.random() > 0.5 ? 0.9 : 0.3;
      colors[i + 2] = 1.0;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    sphereGroup.add(particles);

    // 3. Glowing Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ringGeo1 = new THREE.RingGeometry(2.7, 2.74, 64);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    sphereGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ringGeo2 = new THREE.RingGeometry(3.0, 3.03, 64);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 4;
    sphereGroup.add(ringMesh2);

    // 4. Central Glowing AI Core
    const coreGeo = new THREE.SphereGeometry(1.3, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // 5. Interactive Domain Nodes on Sphere Surface
    const domains: LifeDomain[] = [
      "body",
      "style",
      "communication",
      "finance",
      "knowledge",
      "habits",
    ];

    domains.forEach((dom, index) => {
      const phi = Math.acos(-1 + (2 * index) / domains.length);
      const theta = Math.sqrt(domains.length * Math.PI) * phi;
      const radius = 2.32;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const nodeColor = DOMAIN_COLORS[dom] || 0x00f2fe;

      // Node sphere
      const nodeGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: nodeColor });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      sphereGroup.add(nodeMesh);

      // Pulsing Node Halo Ring
      const auraGeo = new THREE.RingGeometry(0.2, 0.24, 24);
      const auraMat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const auraMesh = new THREE.Mesh(auraGeo, auraMat);
      auraMesh.position.set(x, y, z);
      auraMesh.lookAt(x * 2, y * 2, z * 2);
      sphereGroup.add(auraMesh);
    });

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        sphereGroup.rotation.y += deltaX * 0.005;
        sphereGroup.rotation.x += deltaY * 0.005;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize Handler
    const onResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.012;

      if (!isDragging && autoRotate) {
        sphereGroup.rotation.y += isAgentThinking ? 0.015 : 0.003;
        ringMesh1.rotation.z += isAgentThinking ? 0.02 : 0.004;
        ringMesh2.rotation.z -= isAgentThinking ? 0.015 : 0.003;
        particles.rotation.y -= 0.001;
      }

      // Live pulse
      const pulseSpeed = isAgentThinking ? 8 : 2;
      const pulseAmp = isAgentThinking ? 0.15 : 0.06;
      const pulse = 1 + Math.sin(time * pulseSpeed) * pulseAmp;
      coreMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      if (containerRef.current?.contains(domElement)) {
        containerRef.current.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [autoRotate, isAgentThinking]);

  const avgScore = Math.round(
    domainScores.reduce((acc, d) => acc + d.score, 0) / (domainScores.length || 1)
  );

  return (
    <div className="relative w-full h-[460px] lg:h-[520px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl flex flex-col justify-between p-6">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the APEX Neural Life Sphere"
      />

      {/* Top Header Overlay */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isAgentThinking ? "bg-purple-400 animate-ping" : "bg-cyan-400 animate-pulse"
              }`}
            />
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
              {isAgentThinking ? (
                <>
                  <Bot className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                  <span>AI Agent Neural Reasoning Active</span>
                </>
              ) : (
                <span>APEX Neural Life Telemetry</span>
              )}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
            Holistic Life Balance Sphere
          </h2>
        </div>

        {/* Global Advancement Index */}
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/60 shadow-lg">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">APEX Index</div>
            <div className="text-lg font-mono font-bold text-cyan-300">{avgScore}%</div>
          </div>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-full transition ${
              autoRotate ? "text-cyan-400 bg-cyan-950/60" : "text-slate-400 hover:text-white"
            }`}
            title="Toggle sphere rotation"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Domain Node Selector Badges */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pointer-events-auto">
        {domainScores.map((item) => {
          const isSelected = selectedDomain === item.domain;
          return (
            <button
              key={item.domain}
              onClick={() => onSelectDomain(isSelected ? "all" : item.domain)}
              onMouseEnter={() => setHoveredDomain(item)}
              onMouseLeave={() => setHoveredDomain(null)}
              className={`text-left p-2.5 rounded-2xl transition-all duration-200 border ${
                isSelected
                  ? "bg-cyan-950/80 border-cyan-400 shadow-glow-cyan"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-mono uppercase text-slate-400 truncate">
                  {item.name.split(" ")[0]}
                </span>
                <span
                  className="text-xs font-mono font-bold"
                  style={{
                    color:
                      item.domain === "body"
                        ? "#F43F5E"
                        : item.domain === "finance"
                        ? "#10B981"
                        : item.domain === "communication"
                        ? "#A855F7"
                        : item.domain === "style"
                        ? "#F59E0B"
                        : "#00F2FE",
                  }}
                >
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor:
                      item.domain === "body"
                        ? "#F43F5E"
                        : item.domain === "finance"
                        ? "#10B981"
                        : item.domain === "communication"
                        ? "#A855F7"
                        : item.domain === "style"
                        ? "#F59E0B"
                        : "#00F2FE",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Framework Callout Overlay on Hover/Select */}
      {(hoveredDomain || selectedDomain !== "all") && (
        <div className="absolute top-16 left-6 max-w-sm pointer-events-none z-10 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/40 shadow-xl transition-all animate-fadeIn">
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {(hoveredDomain || domainScores.find((d) => d.domain === selectedDomain))?.name}
            </span>
          </div>
          <p className="text-xs text-slate-200 font-medium">
            {(hoveredDomain || domainScores.find((d) => d.domain === selectedDomain))?.framework}
          </p>
          <div className="mt-2 text-[11px] font-mono text-cyan-300 border-t border-slate-800 pt-2">
            Status:{" "}
            {(hoveredDomain || domainScores.find((d) => d.domain === selectedDomain))?.keyMetric}
          </div>
        </div>
      )}
    </div>
  );
};
