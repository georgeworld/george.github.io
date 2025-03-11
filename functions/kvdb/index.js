export async function onRequest({ request, params, env }) {
    // gblog 是项目中绑定命名空间时的变量名
    const visitCount = await gblog.get('visitCount');
    let visitCountInt = Number(visitCount);
    visitCountInt += 1;
    await gblog.put('visitCount', visitCountInt.toString());
  
    const res = JSON.stringify({
      visitCount: visitCountInt,
    });
  
    return new Response(res, {
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }  