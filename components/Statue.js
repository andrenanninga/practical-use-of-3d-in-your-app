import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import {
  Canvas,
  useLoader,
  useFrame,
} from "react-three-fiber";

const Stage = () => (
  <Canvas
    camera={{
      fov: 65,
      position: new THREE.Vector3(-2.5, 1.5, 2.2),
    }}
    onCreated={({ camera }) =>
      camera.lookAt(new THREE.Vector3(0, 0.7, 0))
    }
  >
    <hemisphereLight
      skyColor="#ffffff"
      groundColor="#111144"
      intensity={1.8}
    />

    <pointLight
      position={[0.2, 2.5, 0.5]}
      color="#ffd000"
      intensity={1}
      distance={12}
      decay={2}
    />

    <React.Suspense fallback={<Spinner />}>
      <Asset
        url="/assets/models/statue-of-a-hunter.glb"
        scale={[0.1, 0.1, 0.1]}
        position={[0, 1, -2]}
      />
    </React.Suspense>
  </Canvas>
);

const Asset = ({ url, ...props }) => {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <group {...props}>
      <primitive object={gltf.scene} />;
    </group>
  );
};

const Spinner = () => {
  const ref = React.useRef();

  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y -= 0.06;
    ref.current.rotation.z += 0.02;
  });

  return (
    <mesh ref={ref} scale={[0.2, 0.2, 0.2]}>
      <octahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export { Stage };
