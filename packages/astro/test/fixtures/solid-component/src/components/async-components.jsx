import { createResource, ErrorBoundary } from 'solid-js';

// It may be good to try short and long sleep times.
// But short is faster for testing.
const SLEEP_MS = 10;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function AsyncComponent(props) {
	const [data] = createResource(async () => {
		// console.log("Start rendering async component " + props.title);
		await sleep(props.delay ?? SLEEP_MS);
		// console.log("Finish rendering async component " + props.title);
		return 'async_result_from_async_component';
	});

	return (
		<div data-name="AsyncComponent" onClick={() => actions.refetch()}>
			{data()}
			{/* NOTE: The props.children are intentionally commented out 
		      to simulate a situation where hydration script might not 
					be injected in the right spot. */}
			{/* {props.children} */}
		</div>
	);
}

export function AsyncErrorComponent() {
	const [data] = createResource(async () => {
		await sleep(SLEEP_MS);
		throw new Error('Async error thrown!');
	});

	return <div>{data()}</div>;
}

export function AsyncErrorInErrorBoundary() {
	return (
		<ErrorBoundary fallback={<div>Async error boundary fallback</div>}>
			<AsyncErrorComponent />
		</ErrorBoundary>
	);
}

export function SyncErrorComponent() {
	throw new Error('Sync error thrown!');
}

export function SyncErrorInErrorBoundary() {
	return (
		<ErrorBoundary fallback={<div>Sync error boundary fallback</div>}>
			<SyncErrorComponent />
		</ErrorBoundary>
	);
}
