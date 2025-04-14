import type * as THREE from "three"
import type { Object3D } from "three"
import type { ReactThreeFiber } from "@react-three/fiber"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Basic Three.js elements
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>
      group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>
      primitive: ReactThreeFiber.Object3DNode<Object3D, typeof Object3D>

      // Lights
      ambientLight: ReactThreeFiber.LightNode<THREE.AmbientLight, typeof THREE.AmbientLight>
      pointLight: ReactThreeFiber.LightNode<THREE.PointLight, typeof THREE.PointLight>

      // Geometries
      planeGeometry: ReactThreeFiber.BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>
      bufferGeometry: ReactThreeFiber.BufferGeometryNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>

      // Materials
      meshStandardMaterial: ReactThreeFiber.MaterialNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>
      shaderMaterial: ReactThreeFiber.MaterialNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial>

      // Attributes
      bufferAttribute: ReactThreeFiber.BufferAttributeNode<THREE.BufferAttribute, typeof THREE.BufferAttribute>

      // Points
      points: ReactThreeFiber.Object3DNode<THREE.Points, typeof THREE.Points>
    }
  }
}
