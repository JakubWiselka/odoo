/** @odoo-module **/

import { registerNewModel } from '@mail/model/model_core';
import { attr } from '@mail/model/model_field';
import { cleanSearchTerm } from '@mail/utils/utils';
import { browser } from "@web/core/browser/browser";
import session from 'web.session';
import field_utils from "web.field_utils";

import { registry } from "@web/core/registry";

import { useModel } from "web.Model";
import { qweb } from "web.core";

import { FormViewDialog } from 'web.view_dialogs';
import FormView from 'web.FormView';
import view_registry from 'web.view_registry';
// import Model from './form_model';
// import Controller from './form_controller';


import {ChatterTopbar} from "@mail/components/chatter_topbar/chatter_topbar";
import {patch} from "web.utils";
const components = {ChatterTopbar};
import rpc from "web.rpc";


import { registerMessagingComponent } from '@mail/utils/messaging_component';
import { useUpdate } from '@mail/component_hooks/use_update/use_update';
import { useComponentToModel } from '@mail/component_hooks/use_component_to_model/use_component_to_model';
import { useRefToModel } from '@mail/component_hooks/use_ref_to_model/use_ref_to_model';




function factory(dependencies) {

    class CannedResponse extends dependencies['mail.model'] {
        // useUpdate({ func: () => this._update() });
        // useComponentToModel({ fieldName: 'component', modelName: 'mail.chatter', propNameAsRecordLocalId: 'chatterLocalId' });
        // useRefToModel({ fieldName: 'threadRef', modelName: 'mail.chatter', propNameAsRecordLocalId: 'chatterLocalId', refName: 'thread' });

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
        // static fetchSuggestions2(searchTerm, { thread } = {}) {}

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
                const cleanedAName = cleanSearchTerm(a.source || '');
                const cleanedBName = cleanSearchTerm(b.source || '');
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
            return [this.messaging.cannedResponses.filter(cannedResponse =>
                cleanSearchTerm(cannedResponse.source).includes(cleanedSearchTerm)
            )];
        }

        /**
         * Returns the text that identifies this canned response in a mention.
         *
         * @returns {string}
         */
        getMentionText() {
            ChatterTopbar
            patch
            rpc

            view_registry
            // Controller
            // Model
            FormView
            FormViewDialog
            session
            browser
            field_utils
            registry
            useModel
            qweb
            attr
            registerNewModel
            debugger;
            var params = new URLSearchParams(window.location.hash);
            return this.env.services.rpc({
                    model: 'mail.shortcode',
                    method: 'get_jinja_formated_text',
                    args: [[this.id], params.get("id"), params.get("model")],
                }
            )
        };
        // async getMentionText() {
        //     debugger;
        //     const userIds = await this.async(() => this.env.services.rpc({
        //         model: 'res.users',
        //         method: 'search',
        //         args: [[['partner_id', '=', this.id]]],
        //         kwargs: {
        //             context: { active_test: false },
        //         },
        //     }, { shadow: true }));
        //     // this.update({ hasCheckedUser: true });

        //     debugger;
        //     if (userIds.length > 0) {
        //         debugger;
        //         this.update({ user: insert({ id: userIds[0] }) });
        //     }

            
        // }
        // async getMentionText() {
        //     await Promise.all(categories.map(async (category) => {
        //         const result = await this.env.services.rpc({
        //             method: "search_panel_select_range",
        //             model: this.config.modelName,
        //             args: [category.fieldName],
        //             kwargs: {
        //                 category_domain: this._getCategoryDomain(category.id),
        //                 enable_counters: category.enableCounters,
        //                 expand: category.expand,
        //                 filter_domain: filterDomain,
        //                 hierarchize: category.hierarchize,
        //                 limit: category.limit,
        //                 search_domain: this.searchDomain,
        //             },
        //             params: {
        //                 context: this.config.context,
        //             },
        //         });
        //         this._createCategoryTree(category.id, result);
        //     }));
        // }

    }

    CannedResponse.fields = {
        id: attr({
            readonly: true,
            required: true,
        }),
        /**
         *  The keyword to use a specific canned response.
         */
        source: attr(),
        /**
         * The canned response itself which will replace the keyword previously
         * entered.
         */
        substitution: attr(),
    };
    CannedResponse.identifyingFields = ['id'];
    CannedResponse.modelName = 'mail.canned_response';

    return CannedResponse;
}

registerNewModel('mail.canned_response', factory);
