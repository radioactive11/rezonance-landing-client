import * as THREE from "three";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	Text,
	useProgress,
	Html,
} from "@react-three/drei";
import {
	Bloom,
	EffectComposer,
	Noise,
	Vignette,
} from "@react-three/postprocessing";
import { useIsTabletOrMobile, useLoadingScreen } from "utils/hooks";
import { NextPage } from "next";
import { IntroProps, VideoTextProps } from "utils/types";
import Overlay from "components/Overlay";
import Head from "next/head";

const Effects : React.FC = () => {
	return (
		<EffectComposer>
			<Vignette eskil={false} offset={0.1} darkness={1.1}/>
		</EffectComposer>
	)
}

const VideoText: React.FC<VideoTextProps> = ({ ready, ...props }) => {
	const isTabletOrMobile = useIsTabletOrMobile();
	const position = isTabletOrMobile
		? [
				props.position[0],
				props.position[1] - 0.75,
				props.position[2],
		  ]
		: props.position;

	const fontConfig = useMemo(
		() => ({
			lineHeight: 1,
			font: "/Montserrat-Bold.woff",
			letterSpacing: -0.025,
		}),
		[]
	);

	return (
		<>
			<Text
				fontSize={isTabletOrMobile ? 0.25 : 0.5}
				position={new THREE.Vector3(...position)}
				{...fontConfig}
			>
				#FreeYourMusic
			</Text>
			<Text
				fontSize={isTabletOrMobile ? 0.125 : 0.2}
				position={[
					position[0],
					position[1] - (isTabletOrMobile ? 0.25 : 0.5),
					position[2],
				]}
				lineHeight={1}
				font="/Montserrat-Hairline.woff"
				letterSpacing={-0.05}
				color="#18A8D8"
			>
				Coming Soon
			</Text>
		</>
	);
};

const Loader: React.FC = () => {
	const { progress } = useProgress();
	return (
		<Html as="div" fullscreen wrapperClass="progress-heading">
			<h1>{progress}%</h1>
		</Html>
	);
};

const App: NextPage = () => {
	const [clicked, setClicked] = useState(false);
	const [ready, setReady] = useState(false);
	const store = { ready, setClicked };
	useLoadingScreen(ready, setClicked);
	return (
		<>
		<Head>
			<title>Rezonance - #FreeYourMusic</title>
		</Head>
			<Canvas
				gl={{ alpha: false }}
				camera={{ position: [0, 2, 100], fov: 15 }}
			>
				<color attach="background" args={["#080808"]} />
				<Suspense fallback={<Loader />}>
					<group position={[0, -1, 0]}>
						<VideoText {...store} position={[0, 1, -4]} />
					</group>
					<ambientLight intensity={0.5} />
					<spotLight position={[0, 10, 3]} intensity={0.3} />
					<directionalLight
						position={[-20, 0, -12]}
						intensity={0.7}
					/>
					<Intro start={ready && clicked} set={setReady} />
				</Suspense>
				<Effects/>
			</Canvas>
			<Overlay visible={ready && clicked} />
		</>
	);
};

const Intro: React.FC<IntroProps> = ({ start, set }) => {
	const [vec] = useState(() => new THREE.Vector3());
	const isTabletOrMobile = useIsTabletOrMobile();
	useEffect(() => {
		setTimeout(() => set(true), 500);
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);
	useFrame(state => {
		if (start) {
			state.camera.position.lerp(
				vec.set(
					state.mouse.x * 4,
					isTabletOrMobile
						? 2 + state.mouse.y * 2
						: 1 + state.mouse.y * 2,
					14
				),
				0.05
			);
			state.camera.lookAt(0, 0, 0);
		}
	});
	return null;
};

export default App;
