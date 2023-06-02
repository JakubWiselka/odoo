/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr } from '@mail/model/model_field';
import { cleanSearchTerm } from '@mail/utils/utils';

function factory(dependencies) {

    class CannedResponse2 extends dependencies['mail.model'] {

        /**
         * Fetches canned responses matching the given search term to extend the
         * JS knowledge and to update the suggestion list accordingly.
         *
         * In practice all canned responses are already fetched at init so this
         * method does nothing.
         *
         * @static
         * @param {string} searchTerm
         * @param {Object} [options={}]
         * @param {mail.thread} [options.thread] prioritize and/or restrict
         *  result in the context of given thread
         */
        static fetchSuggestions(searchTerm, { thread } = {}) {}

        /**
         * Returns a sort function to determine the order of display of canned
         * responses in the suggestion list.
         *
         * @static
         * @param {string} searchTerm
         * @param {Object} [options={}]
         * @param {mail.thread} [options.thread] prioritize result in the
         *  context of given thread
         * @returns {function}
         */
        static getSuggestionSortFunction(searchTerm, { thread } = {}) {
            debugger;
            const cleanedSearchTerm = cleanSearchTerm(searchTerm);
            return (a, b) => {
                const cleanedAName = cleanSearchTerm(a.name || '');
                const cleanedBName = cleanSearchTerm(b.name || '');
                if (cleanedAName.startsWith(cleanedSearchTerm) && !cleanedBName.startsWith(cleanedSearchTerm)) {
                    return -1;
                }
                if (!cleanedAName.startsWith(cleanedSearchTerm) && cleanedBName.startsWith(cleanedSearchTerm)) {
                    return 1;
                }
                if (cleanedAName < cleanedBName) {
                    return -1;
                }
                if (cleanedAName > cleanedBName) {
                    return 1;
                }
                return a.id - b.id;
            };
        }

        /*
         * Returns canned responses that match the given search term.
         *
         * @static
         * @param {string} searchTerm
         * @param {Object} [options={}]
         * @param {mail.thread} [options.thread] prioritize and/or restrict
         *  result in the context of given thread
         * @returns {[mail.canned_response[], mail.canned_response[]]}
         */
        static searchSuggestions(searchTerm, { thread } = {}) {
            debugger;
            const cleanedSearchTerm = cleanSearchTerm(searchTerm);
            return [this.messaging.cannedResponses2.filter(cannedResponse2 =>
                cleanSearchTerm(cannedResponse2.name).includes(cleanedSearchTerm)
            )];
        }

        /**
         * Returns the text that identifies this canned response in a mention.
         *
         * @returns {string}
         */
        getMentionText() {
            // implementatiui when someone clicks on element

            // TODO 
            // 1. implement python function that return generated email for given record
            // 2. search only mail template that belongs to this model
            // 3. remove + sign or replace that with double ::
            // 4. Revrite chnages to seperated module 
            // 
            debugger;
            const a = this.env.services.rpc({
                model: 'res.users',
                method: 'get_rendered_template',
                args: [[this.id], this.id],
            },
            { shadow: true }
            );
            return a;
        }

    }

    CannedResponse2.fields = {
        id: attr({
            readonly: true,
            required: true,
        }),
        /**
         *  The keyword to use a specific canned response.
         */
        name: attr(),
        /**
         * The canned response itself which will replace the keyword previously
         * entered.
         */
        // replace later with HTML field html_body
        subject: attr(),
    };
    CannedResponse2.identifyingFields = ['id'];
    CannedResponse2.modelName = 'mail.canned_response2';

    return CannedResponse2;
}

registerNewModel('mail.canned_response2', factory);
