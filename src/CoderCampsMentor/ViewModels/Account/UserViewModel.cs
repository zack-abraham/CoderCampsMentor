using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoderCampsMentor.ViewModels.Account
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string Id { get; set; }
        public string Picture { get; set; }
        public Dictionary<string,string> Claims { get; set; }
    }
}
