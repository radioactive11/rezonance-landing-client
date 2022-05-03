import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const useLoadingScreen = (
	ready: boolean,
	setClicked: (clicked: boolean) => void
) => {
	useEffect(() => {
		ready && setClicked(true);
		ready ? NProgress.done() : NProgress.start();
	}, [ready, setClicked]);
};

const getMobileDetect = (userAgent: string) => {
	const isAndroid = (): boolean => Boolean(userAgent.match(/Android/i));
	const isIos = (): boolean => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
	const isOpera = (): boolean => Boolean(userAgent.match(/Opera Mini/i));
	const isWindows = (): boolean => Boolean(userAgent.match(/IEMobile/i));
	const isSSR = (): boolean => Boolean(userAgent.match(/SSR/i));

	const isMobile = (): boolean =>
		Boolean(isAndroid() || isIos() || isOpera() || isWindows());
	const isDesktop = (): boolean => Boolean(!isMobile() && !isSSR());
	return {
		isMobile,
		isDesktop,
		isAndroid,
		isIos,
		isSSR,
	};
};

export const useMobileDetect = () => {
	const userAgent =
		typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
	return getMobileDetect(userAgent);
};

export const useIsTabletOrMobile = () => {
	return useMediaQuery({ query: "(max-width: 992px)" });
};
