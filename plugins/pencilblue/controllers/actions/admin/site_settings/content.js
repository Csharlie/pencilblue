/*
    Copyright (C) 2014  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Saves the site's content settings
 */

function Content(){}

//inheritance
util.inherits(Content, pb.BaseController);

Content.prototype.render = function(cb) {
	var self = this;

	this.getJSONPostParams(function(err, post) {
		var message = self.hasRequiredParams(post, ['articles_per_page']);
		if(message) {
	        cb({
				code: 400,
				content: pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, message)
			});
	        return;
	    }

	    pb.settings.set('content_settings', post, function(data) {
	        if(util.isError(data)) {
	            cb({
					code: 500,
					content: pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, self.ls.get('ERROR_SAVING'), result)
				});
	            return;
	        }

			cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, self.ls.get('CONTENT_SETTINGS') + ' ' +  self.ls.get('EDITED'))});
	    });
	});
};

//exports
module.exports = Content;