import { Provider } from 'react-redux';
import React from 'react';
import { createStore } from 'redux';
import reducer from './reducers';
import { cleanup, fireEvent, render as rtlRender, screen } from '@testing-library/react';

function render(
	ui,
	{
		initialState,
		store = createStore(reducer, initialState),
		...renderOptions
	} = {},
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, cleanup, fireEvent, screen };
