import MemoryStore from './MemoryStore';

describe('MemoryStore', () => {
    let
        sut;

    let
        defaultState;

    beforeEach(() => {
        defaultState = {
            myProp: 'myPropDefaultValue'
        };
        sut = new MemoryStore(defaultState);
    });

    it('should initially equal default state', () => {
        expect(sut.get()).toEqual(defaultState);
    });

    // it('should not change default state when store changed', () => {
    //     expect(sut.get()).not.toEqual(defaultState);
    // });

    it('should not be stored', () => {
        expect(sut.isStored()).toEqual(false);
    });

    describe('when update', () => {

        let
            updates,
            storeState,
            newUpdates;

        beforeEach(() => {
            storeState = sut.get();
            updates = {
                it: 'is updates'
            };
            sut.update(updates);
        });

        it('should copy updates into store object', () => {
            expect(sut.get()).toEqual(updates);
        });

        // it('should keep link to store object', () => {
        //     sut.get().should.equal(storeState);
        // });

        it('should invoke onUpdate method with new and old state when exists', () => {
            newUpdates = {};
            sut.onUpdate = jasmine.createSpy('onUpdate');
            sut.update(newUpdates);

            expect(sut.onUpdate).toHaveBeenCalledWith(newUpdates, updates);
        });

        // it('should return store state', () => {
        //     sut.update({}).should.equal(storeState);
        // });

        it('should be stored', () => {
            expect(sut.isStored()).toEqual(true);
        });

        describe('when clear', () => {

            beforeEach(() => {
                spyOn(sut, 'update');
                sut.clear();
            });

            it('should reset store to dafault state', () => {
                expect(sut.update).toHaveBeenCalledWith(defaultState);
            });

            it('should not be stored', () => {
                expect(sut.isStored()).toEqual(false);
            });

        });

    });

});