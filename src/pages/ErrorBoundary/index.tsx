import { ReactNode, useMemo } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorBoundaryBody from './Body';

type ErrorObj = Record<
  string,
  {
    status: number;
    title: string;
    message: string;
    extra?: ReactNode;
  }
>;

const errMsg = {
  'not-found': {
    status: 404,
    title: 'ページが見つかりません',
    message: 'お探しのページが見つかりませんでした.',
  },
  forbidden: {
    status: 403,
    title: 'アクセスが拒否されました',
    message: 'このページにアクセスする権限がありません.',
  },
  other: {
    status: 500,
    title: 'サーバーエラー',
    message: 'サーバーでエラーが発生しました.',
  },
  client: {
    status: 0,
    title: 'クライアントエラー',
    message: '予期せぬエラーが発生しました.',
  },
} as const satisfies ErrorObj;

export default function ErrorBoundaryPage() {
  const error = useRouteError();

  const errObj = useMemo(() => {
    if (!isRouteErrorResponse(error)) return errMsg.client;

    switch (error.status) {
      case 404:
        return errMsg['not-found'];
      case 403:
        return errMsg.forbidden;
      default:
        return errMsg.other;
    }
  }, [errMsg]);

  return <ErrorBoundaryBody {...errObj} />;
}
