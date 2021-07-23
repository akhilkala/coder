import 'package:flutter/foundation.dart';

class User with ChangeNotifier {
  bool isFavorite;

  User({
    this.isFavorite = false,
  });

  void toggleFavoriteStatus() {
    // isFavorite = !isFavorite;
    notifyListeners();
  }
}
