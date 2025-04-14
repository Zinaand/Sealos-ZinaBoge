declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Add all the Three.js elements used in your components
      mesh: any
      group: any
      primitive: any
      planeGeometry: any
      bufferGeometry: any
      meshStandardMaterial: any
      shaderMaterial: any
      bufferAttribute: any
      points: any
      ambientLight: any
      pointLight: any
    }
  }
}
