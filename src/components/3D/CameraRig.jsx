import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const CameraRig = ({ targetPos, targetLookAt, isAnimating, onAnimationComplete }) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (isAnimating && targetPos && targetLookAt) {
      // Interpolate camera position
      camera.position.lerp(new THREE.Vector3(...targetPos), delta * 2);
      
      // Interpolate lookAt target
      currentLookAt.current.lerp(new THREE.Vector3(...targetLookAt), delta * 2);
      camera.lookAt(currentLookAt.current);
      
      // Check if we arrived (approx)
      if (camera.position.distanceTo(new THREE.Vector3(...targetPos)) < 0.1) {
        if (onAnimationComplete) onAnimationComplete();
      }
    }
  });

  return null;
};
