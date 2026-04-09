import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

actor {
  let favorites : Map.Map<Principal, List.List<Text>> = Map.empty<Principal, List.List<Text>>();

  public shared ({ caller }) func addFavorite(characterId : Text) : async () {
    let list = switch (favorites.get(caller)) {
      case (?l) l;
      case null {
        let l = List.empty<Text>();
        favorites.add(caller, l);
        l;
      };
    };
    if (not list.contains(characterId)) {
      list.add(characterId);
    };
  };

  public shared ({ caller }) func removeFavorite(characterId : Text) : async () {
    switch (favorites.get(caller)) {
      case (?list) {
        let updated = list.filter(func(id : Text) : Bool { id != characterId });
        favorites.add(caller, updated);
      };
      case null {};
    };
  };

  public shared query ({ caller }) func getFavorites() : async [Text] {
    switch (favorites.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
  };
};
