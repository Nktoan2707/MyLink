import 'package:equatable/equatable.dart';

class User extends Equatable {
  const User({required this.id});

  final String id;

  @override
  List<Object> get props => [id];

  static const empty = User(id: '-');

  Map<String, dynamic> toMap() {
    return {
      'id': this.id,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['id'] as String,
    );
  }
}
