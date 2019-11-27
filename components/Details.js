import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import {
  Canvas,
  useThree,
  useFrame,
  useLoader,
} from "react-three-fiber";
import { useSpring, config, a } from "react-spring/three";

const cameraPositions = {
  statue: [-2.5, 1.5, 2.2],
  hunter: [1.5, 3.5, 2.5],
  dogs: [-3, 0.7, -0.2],
};

const Stage = () => {
  const [focus, setFocus] = React.useState("hunter");

  const { cameraPosition } = useSpring({
    cameraPosition: cameraPositions[focus],
    config: config.molasses,
  });

  return (
    <>
      <Canvas>
        <Camera fov={65} position={cameraPosition} />

        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#888888"
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
      <Controls focus={focus} onClick={setFocus} />
    </>
  );
};

const Camera = ({ position, ...props }) => {
  const ref = React.useRef();
  const { setDefaultCamera } = useThree();

  React.useEffect(() => {
    setDefaultCamera(ref.current);
  }, []);

  useFrame(() => {
    ref.current.updateMatrixWorld();
    ref.current.lookAt(new THREE.Vector3(0, 0.7, 0));
  });

  return (
    <a.perspectiveCamera
      ref={ref}
      position={position}
      {...props}
    />
  );
};

const Controls = ({ focus, onClick }) => (
  <ul
    style={{
      listStyle: "none",
      position: "absolute",
      top: "5vh",
      left: "5vh",
    }}
  >
    <li>
      <button
        onClick={() => onClick("statue")}
        style={{ transform: "scale(2.5)" }}
      >
        {focus === "statue" ? "👉" : ""} Statue
      </button>
    </li>
    <li>
      <button
        onClick={() => onClick("hunter")}
        style={{ transform: "scale(2.5)" }}
      >
        {focus === "hunter" ? "👉" : ""}Hunter
      </button>
    </li>
    <li>
      <button
        onClick={() => onClick("dogs")}
        style={{ transform: "scale(2.5)" }}
      >
        {focus === "dogs" ? "👉" : ""}Dogs
      </button>
    </li>
  </ul>
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
