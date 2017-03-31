﻿namespace CoderCampsMentor.Controllers {

    export class ProfilesController {
        public message = 'Hello from profile page';
        public userCategories;
        public userSubCategories;


        constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService) {
            let pId = this.$stateParams['id'];
            console.log(pId);

            this.$http.get('/api/usercategories/' + pId).then((response) => {
                this.userCategories = response.data;
            });

            this.$http.get('/api/usersubcategories/' + pId).then((response) => {
                this.userSubCategories = response.data;
            });
        }
    }

    export class ProfileController {
        public file;
        public user;
        public categories;
        public subCategories;
        public UserCategory;
        public UserSubCategory;
        constructor(private profileService: CoderCampsMentor.Services.ProfileService, private filepickerService, private $scope: ng.IScope, private $state: ng.ui.IStateService, private accountService: CoderCampsMentor.Services.AccountService, private $http: ng.IHttpService) {

            this.getUserById();
            this.getCategoriesAndSubCategories();
        }

        private getUserById() {
            this.profileService.getUserById(this.isLoggedIn()).then((data) => {
                this.user = data;
            });
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public logout() {
            this.accountService.logout();
        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        public submit() {
            this.$state.go('home');
        }

        public pickFile() {
            this.filepickerService.pick(
                {
                    mimetype: 'image/*',
                    imageQuality: 60
                },
                this.fileUploaded.bind(this)
            );
        }

        public fileUploaded(file) {
            // save file url to database
            this.file = file;
            this.user.picture = this.file.url;
            this.$scope.$apply(); // force page to update
        }

        public defaultPic() {
            if (this.user.picture == null) {
                this.user.picture = "/images/avatar.jpg";
                this.profileService.saveProfile(this.user);
                this.$state.go('home');
            }
            else (this.user.picture == !null); {
                this.user.picture = "/images/avatar.jpg";
                this.profileService.saveProfile(this.user);
                this.$state.go('home');
            }
        }

        public saveProfile() {
            if (this.user.picture == !null) {
                this.profileService.saveProfile(this.user);
            }
            else (this.user.picture == null); {
                this.profileService.saveProfile(this.user);
            }
            this.profileService.saveProfile(this.user)
                .then((data) => {
                    this.$state.go('home');
                }).catch(() => {
                    console.log("something went wrong");
                })
        }

        public getCategoriesAndSubCategories() {
                    this.$http.get('/api/categories').then((response) => {
                this.categories = response.data;
            });

            this.$http.get('/api/subCategories').then((response) => {
                this.subCategories = response.data;
            });
        }
        public editProfile() {
            this.profileService.saveProfile(this.user).then((data) => {
                this.$state.go('profile');
            });
        }
        public addCategoryToUser() {
            this.$http.post('/api/userCategories', this.UserCategory).then((response) => {
                this.$state.go('home');
            });

        }
        public addSubCategoryToUser() {
            this.$http.post('/api/userSubCategories', this.UserSubCategory).then((response) => {
                this.$state.go('home');
            });
        }
    }
}