import * as React from 'react';
import NewPoll from "./NewPoll";

import { Provider } from 'react-redux';
import store from "../../store";
import { MemoryRouter } from 'react-router';

import { render, fireEvent } from "@testing-library/react";

describe("NewPoll", () => {
	it("will have title and subtitle", () => {
		const component = render(
			<MemoryRouter>
			  <Provider store={store}>
		   		<NewPoll />
		 		</Provider>
	  	</MemoryRouter>
		);
		expect(component).toMatchSnapshot();
	});

	it("the button is disabled if none of the options are entered", () => {
		const component = render(
			<MemoryRouter>
			  <Provider store={store}>
		   		<NewPoll />
				</Provider>
			</MemoryRouter>
		);

		var submitButton = component.getByTestId('submit-new-poll');
		expect(submitButton.disabled).toBe(true);
	});

	it("the button is disabled if first option is not entered", () => {
		const component = render(
			<MemoryRouter>
			  <Provider store={store}>
		   		<NewPoll />
				</Provider>
			</MemoryRouter>
		);

		var submitButton = component.getByTestId('submit-new-poll');
		var optionTwoInput = component.getByTestId('option-two-input');
		fireEvent.change(optionTwoInput, { target: { value: 'B' } });
		expect(submitButton.disabled).toBe(true);
	});

	it("the button is disabled if second option is not entered", () => {
		const component = render(
			<MemoryRouter>
			  <Provider store={store}>
		   		<NewPoll />
				</Provider>
			</MemoryRouter>
		);

		var submitButton = component.getByTestId('submit-new-poll');
		var optionOneInput = component.getByTestId('option-one-input');
		fireEvent.change(optionOneInput, { target: { value: 'A' } });
		expect(submitButton.disabled).toBe(true);
	});

	it("the button is enabled if both options are entered", () => {
		const component = render(
			<MemoryRouter>
			  <Provider store={store}>
		   		<NewPoll />
				</Provider>
			</MemoryRouter>
		);

		var submitButton = component.getByTestId('submit-new-poll');
		var optionOneInput = component.getByTestId('option-one-input');
		fireEvent.change(optionOneInput, { target: { value: 'A' } });
		var optionTwoInput = component.getByTestId('option-two-input');
		fireEvent.change(optionTwoInput, { target: { value: 'B' } });
		expect(submitButton.disabled).not.toBe(true);
	});
});