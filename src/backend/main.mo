import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import UserApproval "mo:caffeineai-user-approval/approval";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import Map "mo:core/Map";

actor {
  // Prefab components
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinObjectStorage();
  let userApprovalState = UserApproval.initState(accessControlState);

  // Project types
  module State {
    public type UserProfile = {
      name : Text;
    };
  };

  // Project state
  let userProfiles = Map.empty<Principal, State.UserProfile>();

  // Getter and setter for user profile
  public query ({ caller }) func getCurrentUserProfile() : async ?State.UserProfile {
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : State.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?State.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public query ({ caller }) func getAllUserProfiles() : async [State.UserProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admin can view all profiles");
    };
    userProfiles.values().toArray();
  };

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(userApprovalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(userApprovalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(userApprovalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(userApprovalState);
  };
};
