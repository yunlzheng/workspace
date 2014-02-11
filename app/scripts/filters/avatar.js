'use strict';

angular.module('towerApp')
	.filter('avatar', function(){

		var avatarFilter = function(user){

			if(user.provider === 'google'){
				return user['google'].picture;
			}else if(user.provider === 'github'){
				return user['github'].avatar_url;
			}else{
				return '/images/identicon.png';
			}

		}

		return avatarFilter;

	});