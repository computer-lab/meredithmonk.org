import React from 'react'
import Mailchimp from 'react-mailchimp-form'

const MailingListSignup = () => (
  <React.Fragment>
    <Mailchimp
      action="https://meredithmonk.us15.list-manage.com/subscribe/post?u=349d5f001eb5db91008f08f61&amp;id=4f8daddaaf"
      className="react-mailchimp-form"
      buttonClassName="btn btn-primary"
      fields={[
        {
          name: 'EMAIL',
          placeholder: 'Email (required)',
          type: 'email',
          required: true,
        },
        {
          name: 'FNAME',
          placeholder: 'First Name',
          type: 'text',
          required: false,
        },
        {
          name: 'LNAME',
          placeholder: 'Last Name',
          type: 'text',
          required: false,
        },
      ]}
      messages={{
        sending: 'Sending...',
        success: 'Thank you for subscribing!',
        error: 'An unexpected internal error has occurred.',
        empty: 'You must provide an email address.',
        duplicate: 'This email address is already subscribed to our mailing list.',
        button: 'Subscribe',
      }}
      styles={{
        sendingMsg: {
          color: '#0652DD',
        },
        successMsg: {
          color: '#009432',
        },
        duplicateMsg: {
          color: '#EE5A24',
        },
        errorMsg: {
          color: '#ED4C67',
        },
      }}
    />
  </React.Fragment>
)

export default MailingListSignup
