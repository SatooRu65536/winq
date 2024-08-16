# プロジェクトファイル仕様
サンプル: [/example/project.yaml](/example/project.yaml)

## Root
```yaml
Fixture:
  - Universe1
  - Universe2
Functions:
  - Function1
  - Function2
```

### Referece
- [Fixtures](#Fixtures)
- [Functions](#Functions)

## Fixtures
ユニバースごとにデバイス一覧を定義します。

```yaml
Fixturesa:
  - Universe1
    - Device1
    - Device2
  - Universe2
    - Device3
    - Device4
```

### Referece
- [Universe](#Universe)
- [Device](#Device)

## Universe
ユニバースのデバイス一覧を定義します.

キーはユニバース名(任意の文字列)です.

```yaml
- Unierse1
  - Device1
  - Device2
- Universe2
  - Device3
  - Device4
```

### Referece
- [Device](#Device)

## Device
デバイスの詳細を定義します.

キーはデバイス名(任意の文字列)です.

| Key | Type |Description |
| --- | ---- | ----------- |
| Manufacturer |　String | メーカー名 |
| Model | String | モデル名 |
| Mode | String | モード名 |
| Address | Integer(1-512) | 使用するチャンネルの開始番号※1 |
| Channels | Integer(1-512) | 使用するチャンネル数 |

※1 QLC+ では 0-511 として扱われている点に注意してください.

```yaml
- デバイス名:
  Manufacturer: メーカー名
  Model: モデル名
  Mode: モード名
  Address: アドレス
  Channels: チャンネル数
```

## Functions
ファンクション一覧を定義します.

```yaml
Functions:
  - Function1
  - Function2
```

### Referece
- [Function](#Function)

## Function
ファンクションの詳細を定義します.

<!-- TODO -->
