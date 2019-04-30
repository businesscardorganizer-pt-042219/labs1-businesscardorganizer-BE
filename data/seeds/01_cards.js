
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cards').del()
    .then(function () {
      // Inserts seed entries
      return knex('cards').insert([
        {initial: 'Mr',
         first_name: 'am',
         last_name: 'Smith',
         work_title: 'Director',
         address1: '1600 Pennsylvania Ave NW',
         address2: '',
         city: 'Washington',
         state: 'DC',
         zip: '20500',
         country: 'USA',
         company_name: 'The White House',
         cell_phone: '(123)-456-78-90',
         work_phone: '(098)-765-43-21',
         URL: 'Lambda.com',
         QR_code: '',
         github: '',
         linkedIn: '',
         own_flag: '1'
        },

         {
         initial: 'Mr',
         first_name: 'John',
         last_name: 'Smith',
         work_title: 'Director',
         address1: '1600 Pennsylvania Ave NW',
         address2: '',
         city: 'Washington',
         state: 'DC',
         zip: '20500',
         country: 'USA',
         company_name: 'The White House',
         cell_phone: '(123)-456-78-90',
         work_phone: '(098)-765-43-21',
         URL: 'Lambda.com',
         QR_code: '',
         github: '',
         linkedIn: ''
        },
        {
        initial: 'Mr',
         first_name: 'Frodo',
         last_name: 'Smith',
         work_title: 'Director'
        }
      ]);
    });
};

