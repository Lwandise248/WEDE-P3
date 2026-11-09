/* Google Forms delivery for the Open Circuit enquiry form. */
window.OPEN_CIRCUIT_FORM_CONFIG = {
    endpoint: '',
    recipientEmail: '',
    googleForm: {
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfBtQKgd2iUtmg_TaU6xxTDXfjkcStd2sMIVsXGj_lyd9ctAg/formResponse',
        fields: {
            name:    'entry.37929245',
            email:   'entry.1966158449',
            phone:   'entry.9887424',
            topic:   'entry.461074244',
            area:    'entry.1237394336',
            message: 'entry.1034217556'
        },
        // Website dropdown values -> exact option text in the Google Form
        topics: {
            'general':            'General question or feedback',
            'electrical-repairs': 'Electrical repairs or rewiring',
            'installation':       'Installations or DB board upgrade',
            'solar':              'Solar panels or Installations',
            'backup':             'Battery or Backup Power',
            'product':            'A product or equipment',
            'sponsorship':        'Sponsorship or volunteering',
            'other':              'Other service enquiry'
        }
    }
};