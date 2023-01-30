import React from 'react';
import { cleanup, render, screen, fireEvent } from '@site/src/test-utils';
import AppRegistrationForm from '../AppRegistrationForm';

describe('AppRegistrationForm', () => {
  beforeEach(() => {
    render(<AppRegistrationForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the form', () => {
    const form = screen.getByTestId('app-registration-form');
    expect(form).toBeInTheDocument();
  });

  it('should show app information form field title', () => {
    const title = screen.getByText(/app information/i);
    expect(title).toBeInTheDocument();
  });

  it('should show OAuth details title', () => {
    const title = screen.getByText(/oauth details/i);
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(
      /This allows clients to log in to your app using their Deriv accounts without an API token/i,
    );
    expect(subtitle).toBeInTheDocument();
  });

  it('should render api token field', async () => {
    // Testing to see if parts of the input render properly
    const subtitle = screen.getByText(/paste your api token with the admin scope here/i);
    expect(subtitle).toBeInTheDocument();

    const token_field = screen.getByLabelText(/api token \(required\)/i);
    expect(token_field).toBeInTheDocument();

    // Checking if the error message works
    fireEvent.blur(token_field);

    const error_message = await screen.findByText(
      /enter your api token \(with the admin scope\) to register your app/i,
    );
    expect(error_message).toBeInTheDocument();

    // Testing to see if the interactive input UI works
    fireEvent.focus(token_field);

    const api_token_label = screen.getByTestId('api-token-label');
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');

    fireEvent.change(token_field, { target: { value: 'abcdef123456' } });
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');
  });

  it('should render app name field', async () => {
    // Testing to see if parts of the input render properly
    const app_name_field = screen.getByLabelText(/app name \(required\)/i);
    expect(app_name_field).toBeInTheDocument();

    // Checking if the error message works
    fireEvent.blur(app_name_field);

    const error_message = await screen.findByText(/enter your app name/i);
    expect(error_message);

    // Testing to see if the interactive input UI works
    fireEvent.focus(app_name_field);

    const api_token_label = screen.getByTestId('app-name-label');
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');

    fireEvent.change(app_name_field, { target: { value: 'my app name' } });
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');
  });

  it('should render markup field', async () => {
    const title = screen.getByTestId('markup-title');
    expect(title).toBeInTheDocument();

    // Testing to see if parts of the input render properly
    const subtitle = screen.getByText(
      /You can earn commission by adding a markup to the price of each trade. Enter your markup percentage here/i,
    );
    expect(subtitle).toBeInTheDocument();

    const info_text = screen.getByText(/Otherwise, enter a number up to 5. Maximum: 5.00%/i);
    expect(info_text).toBeInTheDocument();

    // Testing to see if parts of the input render properly
    const markup_field = screen.getByLabelText(/markup percentage \(required\)/i);
    expect(markup_field).toBeInTheDocument();

    // Testing to see if the interactive input UI works
    fireEvent.focus(markup_field);

    const api_token_label = screen.getByTestId('markup-label');
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');

    fireEvent.change(markup_field, { target: { value: 123 } });
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');

    fireEvent.blur(markup_field);

    const error_message = await screen.findByText(
      /Your markup value must be equal to or above 0.00 and no more than 5.00/i,
    );
    expect(error_message).toBeInTheDocument();

    fireEvent.change(markup_field, { target: { value: '' } });
    fireEvent.blur(markup_field);

    const error_message2 = await screen.findByText(/enter a markup value/i);
    expect(error_message2).toBeInTheDocument();
  });

  it('should render authorisation URL field', async () => {
    // Testing to see if parts of the input render properly
    const subtitle = screen.getByText(
      /This allows clients to log in to your app using their Deriv accounts without an API token/i,
    );
    expect(subtitle).toBeInTheDocument();

    const info_text = screen.getByText(
      /Please note that this URL will be used as the OAuth redirect URL for the OAuth authorisation/i,
    );
    expect(info_text).toBeInTheDocument();

    const authorisation_field = screen.getByLabelText(/authorisation url \(required\)/i);
    expect(authorisation_field).toBeInTheDocument();

    // Checking if the error message works
    fireEvent.blur(authorisation_field);

    const error_message = await screen.findByText(/Enter your authorisation URL/i);
    expect(error_message).toBeInTheDocument();

    fireEvent.change(authorisation_field, { target: { value: 'abcd' } });
    fireEvent.blur(authorisation_field);

    const error_message2 = await screen.findByText(/Enter a valid URL/i);
    expect(error_message2).toBeInTheDocument();

    // Testing to see if the interactive input UI works
    fireEvent.focus(authorisation_field);

    const api_token_label = screen.getByTestId('authorisation-label');
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');

    fireEvent.change(authorisation_field, { target: { value: 'https://test' } });
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');
  });

  it('should render verification URL field', async () => {
    // Testing to see if parts of the input render properly
    const verification_field = screen.getByLabelText(/verification url \(required\)/i);
    expect(verification_field).toBeInTheDocument();

    // Checking if the error message works
    fireEvent.blur(verification_field);

    const error_message = await screen.findByText(/Enter an URL/i);
    expect(error_message).toBeInTheDocument();

    fireEvent.change(verification_field, { target: { value: 'abcd' } });
    fireEvent.blur(verification_field);

    const error_message2 = await screen.findByText(/Enter a valid URL/i);
    expect(error_message2).toBeInTheDocument();

    // Testing to see if the interactive input UI works
    fireEvent.focus(verification_field);

    const api_token_label = screen.getByTestId('verification-label');
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');

    fireEvent.change(verification_field, { target: { value: 'https://test' } });
    expect(api_token_label).toHaveStyle('color: var(--colors-blue400)');
  });

  it('should render the scope checkboxes', () => {
    const title = screen.getByText(/Scope of authorisation/i);
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(/Select the scope for your app/i);
    expect(subtitle).toBeInTheDocument();

    const read_scope = screen.getByTestId('read-scope');
    expect(read_scope).toBeInTheDocument();

    const read_scope_text = screen.getByText(
      /You'll have full access to your clients' information/i,
    );
    expect(read_scope_text).toBeInTheDocument();

    fireEvent.click(read_scope);
    expect(read_scope).toBeChecked();

    const trade_scope = screen.getByTestId('trade-scope');
    expect(trade_scope).toBeInTheDocument();

    fireEvent.click(trade_scope);
    expect(trade_scope).toBeChecked();

    const trading_info_scope = screen.getByTestId('trading-info-scope');
    expect(trading_info_scope).toBeInTheDocument();

    fireEvent.click(trading_info_scope);
    expect(trading_info_scope).toBeChecked();

    const payments_scope = screen.getByTestId('payments-scope');
    expect(payments_scope).toBeInTheDocument();

    fireEvent.click(payments_scope);
    expect(payments_scope).toBeChecked();

    const admin_scope = screen.getByTestId('admin-scope');
    expect(admin_scope).toBeInTheDocument();

    fireEvent.click(admin_scope);
    expect(admin_scope).toBeChecked();
  });

  it('should render the terms of conditions', () => {
    const terms_of_conditions = screen.getByText(
      /By registering your application, you acknowledge that you've read and accepted the Deriv API terms and conditions/i,
    );
    expect(terms_of_conditions).toBeInTheDocument();
  });

  it('should render the registration button', () => {
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/register as application/i);
  });
});
