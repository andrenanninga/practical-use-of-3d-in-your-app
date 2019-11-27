import * as THREE from "three";
import React from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";

const Stage = () => {
  return (
    <Canvas
      camera={{
        position: new THREE.Vector3(0, 3, 5),
      }}
      onCreated={({ camera }) =>
        camera.lookAt(new THREE.Vector3(0, 0, 0))
      }
    >
      <StaticBox position={[-2, 0, 0]} />
      <RotatingBox position={[0, 0, 0]} />
      <JumpingBox position={[2, 0, 0]} />
    </Canvas>
  );
};

const StaticBox = props => (
  <mesh {...props}>
    <boxGeometry attach="geometry" args={[1, 1, 1]} />
    <meshNormalMaterial attach="material" />
  </mesh>
);

const RotatingBox = props => {
  const ref = React.useRef();
  const [isRotating, setRotating] = React.useState(false);

  useFrame(() => {
    if (isRotating) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.z += 0.02;
    }
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={e => setRotating(true)}
      onPointerOut={e => setRotating(false)}
      {...props}
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

const JumpingBox = props => {
  const [jump, setJump] = React.useState(false);
  const { position } = useSpring({
    position: jump ? [0, 2, 0] : [0, 0, 0],
  });

  return (
    <group {...props}>
      <a.mesh
        position={position}
        onClick={() => setJump(!jump)}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshNormalMaterial attach="material" />
      </a.mesh>
    </group>
  );
};

export { Stage };
