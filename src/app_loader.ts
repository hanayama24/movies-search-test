const rootEl = document.getElementById('sb-app-root') as HTMLDivElement;
__webpack_public_path__ = rootEl.dataset.appUrl || '';

// tslint:disable-next-line: space-in-parens
import(/* webpackChunkName: "App" */'./AppRender')
	.then(({ init }) => init(rootEl))
	.catch((error) => {
		throw error;
	});

export default {};
