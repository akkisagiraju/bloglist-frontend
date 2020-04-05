describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
    cy.signup({
      name: 'Akhil',
      username: 'akki',
      password: '123456789',
    });
  });

  it('shows login form when app is opened', () => {
    cy.contains('log in');
  });

  describe('Login', () => {
    it('fails with wrong password/username', () => {
      cy.get('#username').type('Akki');
      cy.get('#password').type('1234456');
      cy.get('#login-button').click();
      cy.contains('wrong credentials');
    });

    it('succeeds with correct credentials', () => {
      cy.login({ username: 'akki', password: '123456789' });
      cy.contains('Akhil is logged in');
    });
  });

  describe('When logged in', () => {
    it('allows a user to create a blog', () => {
      cy.login({ username: 'akki', password: '123456789' });
      cy.contains('new blog').click();
      cy.get('#title').type('First blog');
      cy.get('#author').type('Akhil');
      cy.get('#url').type('http://google.com/akki');
      cy.get('#create').click();
      cy.contains('First blog');
    });
  });
});
