const {assert} = require('chai');
const User = require('../../lib/models/user');
// const Schema = mongoose.Schema;
const RequiredString = require('../../lib/utils/required-string');

describe( 'User Model', () => {
    const user = new User ({
        name: RequiredString,
        email: RequiredString,
        password: RequiredString,
        // character: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'Character' 
        // }    
    });

    it('should validate model', () => {
        assert.equal(user.validateSync(), 'undefined');
    });

    it('checks required fields', () => {
        const badUser = new User ({});
        const {errors} = badUser.validateSync();
        assert.equal(errors.name.kind, 'required');
    });
});