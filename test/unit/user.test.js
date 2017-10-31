const {assert} = require('chai');
const User = require('../../lib/models/user');

describe( 'User Model', () => {
    const user = new User ({
        name: 'ckr',
        email: 'me@me.com',
        password: 'hello',
        character: '59eb914ffcd9df5be2d25d18'   
    });

    it('should validate the user model', () => {
        assert.equal(user.validateSync(), undefined);
    });

    it('checks required fields', () => {
        const badUser = new User ({});
        const {errors} = badUser.validateSync();
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.password.kind, 'required');
        // TODO:  need .getAll method before validating this test
        // assert.equal(errors.character.kind, '???');
    });
});