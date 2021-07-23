import 'package:flutter/material.dart';
import 'package:mobile/pages/home.dart';
import 'package:mobile/providers/auth.dart';
import 'package:provider/provider.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => User(),
        ),
      ],
      child: MaterialApp(
          title: 'Coder',
          theme: ThemeData(
            primarySwatch: Colors.amber,
          ),
          routes: {"/": (ctx) => HomePage()}),
    );
  }
}
