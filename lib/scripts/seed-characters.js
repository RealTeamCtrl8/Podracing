const superagent = require('superagent');
const Character = require('../models/character');

module.exports = function () {
    return Character.find().count()
        .then(count => {
            if(count === 0) {
                return importCharacters();
            }
        });
};

function importCharacters() {
    const catalogArr = Array(9).fill();

    return Promise.all(
        catalogArr.map((item, i) => {
            const charactersUrl = `https://swapi.co/api/people/?page=${i + 1}`;
            return superagent.get(charactersUrl)
                .then(characterRes => characterRes.body.results);
        })
    )
        .then(pages => {
            return pages.reduce((acc, page) => {
                return acc.concat(page);
            }, []);
        })
        .then(characters => {
            return Promise.all(
                characters.map((character) => {
                    return new Character(character).save();
                })
            );
        });
}