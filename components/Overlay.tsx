import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import styles from "styles/overlay.module.scss";
import { OverlayProps } from "utils/types";

const Overlay: React.FC<OverlayProps> = ({ visible }) => {
	return (
		<CSSTransition
			in={visible}
			timeout={500}
			classNames="overlay-container"
		>
			{visible ? (
				<div className={styles.overlayContainer}>
					<div className={styles.logoWrapper}>
						<Image src="/rezo-logo.svg" alt="Rezo" height={32} width={32}/>
						<span>
							<b>Rezonance</b>
						</span>
					</div>
					<div className={styles.right}>
						<a href={window.location.href}>
							<b>rezonance.in</b>
						</a>
						<a href="https://www.instagram.com/rezonanceindia/">
							@rezonanceindia
						</a>
					</div>
				</div>
			) : (
				<></>
			)}
		</CSSTransition>
	);
};

export default Overlay;
