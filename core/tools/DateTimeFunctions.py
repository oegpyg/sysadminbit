#encoding: utf-8
from datetime import timedelta, time


def formatDate(myDate, formatstr=None):
    from core.models import SystemSettings
    sset = SystemSettings.objects.all()
    if myDate.year < 1900: 
        return ""
    return myDate.strftime(sset[0].DateFormat)


def addWeeks(myDate, weeks):
    return addDays(myDate, weeks * 7)


def addDays(myDate, days):
    try:
        myDate += timedelta(days)
    except:
        pass
    return myDate


def addTime(myTime1, myTime2):
    #ver si puede ser mas elegante y generico
    d1 = timedelta(hours=myTime1.hour, minutes=myTime1.minute, seconds=myTime1.second)
    d2 = timedelta(hours=myTime2.hour, minutes=myTime2.minute, seconds=myTime2.second)
    d3 = d1 + d2
    mins = d3.seconds // 60
    secs = d3.seconds % 60
    hrs = mins // 60
    mins = (mins - hrs) * 60
    myTime = time(hrs, mins, secs)
    return myTime


def addMinutes(myTime, minutes):
    td = timedelta(hours=myTime.hour, minutes=(myTime.minute + minutes), seconds=myTime.second)
    mins = td.seconds // 60
    secs = td.seconds % 60
    hrs = mins // 60
    mins = (mins - hrs) * 60
    return time(hrs, mins, secs)


def subTime(myTime1, myTime2):
    #ver si puede ser mas elegante y generico
    d1 = timedelta(hours=myTime1.hour, minutes=myTime1.minute, seconds=myTime1.second)
    d2 = timedelta(hours=myTime2.hour, minutes=myTime2.minute, seconds=myTime2.second)
    d3 = d1 - d2
    mins = d3.seconds // 60
    secs = d3.seconds % 60
    hrs = mins // 60
    mins = (mins - hrs) * 60
    myTime = time(hrs, mins, secs)
    return myTime


def timeDiff(myTime1, myTime2):
    d1 = timedelta(hours=myTime1.hour, minutes=myTime1.minute, seconds=myTime1.second)
    d2 = timedelta(hours=myTime2.hour, minutes=myTime2.minute, seconds=myTime2.second)
    return d1-d2


def integerToTimeDelta(int):
    from datetime import timedelta
    hs = (int - (int % 3600)) / 3600
    min = ((int % 3600) - ((int % 3600) % 60)) / 60
    sg = int - (hs * 3600) - (min * 60)
    #time = ("%02.f" % hs) + ":" + ("%02.f" % min) + ":" + ("%.0f" % sg)
    res = timedelta(0, sg, 0, 0, min, hs)
    return res


def timeToInteger(time):
    return (time.hour * 3600) + (time.minute * 60) + time.second


def dateDiff(StartDate, EndDate):
    res = EndDate - StartDate
    return res.days


def daterange(sdate,edate, step=timedelta(1)):
    """ Para iterar sobre rangos de fechas"""
    if not isinstance(step, timedelta):
        step = timedelta(step)
    ZERO = timedelta(0)
    if sdate < edate:
        if step <= ZERO:
            raise StopIteration
        test = edate.__gt__
    else:
        if step >= ZERO:
            raise StopIteration
        test = edate.__lt__
    while test(sdate):
        yield sdate
        sdate += step


def isWorkday(myDate, notworkdays=[5, 6]):
    #Lu=0,Ma=1,Mi=2,Ju=3,Vi=4,Sa=5,Do=6
    #print myDate.weekday()
    if myDate.weekday() in notworkdays:
        return False
    from core.models import Holiday
    days = Holiday.objects.all()
    if myDate in days.dates.keys():
        return False
    return True


def getWorkDates(fromdate, todate, notworkdays=[5, 6]):
    wdays = []
    cdate = fromdate
    while cdate <= todate:
        if isWorkday(cdate, notworkdays):
            wdays.append(cdate)
        cdate = addDays(cdate, 1)
    return wdays


def lastworkday(myDate):
    from datetime import date
    d = date.today()
    from core.models import Holiday
    days = Holiday.objects.all()
    while myDate.weekday() in (6, 7) or myDate in days.dates.keys():
        d = addDays(d, -1)
    return d


def isLeapYear(yycur):
    if (yycur % 4 == 0 and yycur % 100 != 0) or yycur % 400 == 0:
        return True
    return False


def addYears(myDate, years):
    from datetime import date
    day = myDate.day
    if myDate.month == 2 and myDate.day == 29 and not ((myDate.year+years) % 4 == 0 and (myDate.year+years) % 100 != 0 or (myDate.year+years) % 400 == 0):
        day -= 1
    myDate = date(myDate.year+years, myDate.month, day)
    return myDate


def getQuarter(myDate):
    from datetime import date
    return ((myDate.month - 1) // 3) + 1


def addQuarter(myDate):
    from datetime import date
    nyear  = myDate.year + (myDate.month + 3) // 12
    nmonth = (myDate.month + 3)
    if nmonth > 12:
        nmonth = nmonth % 12
    myDate = date(nyear, nmonth, myDate.day)
    return myDate


def isLastDay(CurYY, CurMM, CurDD, fulldate=None):
    if fulldate:
        CurYY = fulldate.year
        CurMM = fulldate.month
        CurDD = fulldate.day
    lastday = False
    if CurMM in (4, 6, 9, 11):
        if CurDD == 30:
            lastday = True
    if CurMM in (1, 3, 5, 7, 8, 10, 12):
        if CurDD == 31:
            lastday = True
    if CurMM == 2:
        if not isLeapYear(CurYY) and CurDD == 28:
            lastday = True
        if isLeapYear(CurYY) and CurDD == 29:
            lastday = True
    return lastday


def getLastDay(CurYY, CurMM, fulldate=None):
    if fulldate:
        CurYY = fulldate.year
        CurMM = fulldate.month
    if CurMM in (4, 6, 9, 11):
        return 30
    if CurMM in (1, 3, 5, 7, 8, 10, 12):
        return 31
    if CurMM == 2:
        if not isLeapYear(CurYY):
            return 28
        if isLeapYear(CurYY):
            return 29


def addMonths(myDate, months):
    from datetime import date

    CurDD = myDate.day
    CurMM = myDate.month
    CurYY = myDate.year
    AddDD = 0
    AddMM = months
    AddYY = 0
    SumDD = CurDD + AddDD
    SumMM = CurMM + AddMM
    SumYY = CurYY + AddYY

    while SumMM > 12:
        SumMM -= 12
        SumYY += 1
    while SumMM < 1:
        SumMM += 12
        SumYY -= 1
    #print "isLastDay(CurYY,CurMM,CurDD)", CurDD,CurMM,CurYY, isLastDay(CurYY,CurMM,CurDD)
    if isLastDay(CurYY, CurMM, CurDD) or SumDD > getLastDay(SumYY, SumMM):
        SumDD = getLastDay(SumYY, SumMM)
    myDate = date(SumYY, SumMM, SumDD)
    return myDate


def stringToDate(dstring):
    from datetime import date
    if "-" in dstring:
        a, b, c = dstring.split("-")
    elif "/" in dstring:
        a, b, c = dstring.split("/")
    elif "." in dstring:
        a, b, c = dstring.split(".")
    else:
        if len(dstring) in (6, 8):
            a = dstring[0:2]
            b = dstring[2:4]
            c = dstring[4:]
        else:
            return ""
    a = int(a)
    b = int(b)
    c = int(c)
    if a > 31:
        year = a
        month = b
        day = c
    elif c > 31:
        day = a
        month = b
        year = c
    else:
        day = a
        month = b
        year = 1900 + c
    try:
        myDate = date(year, month, day)
    except:
        myDate = None
    return myDate


def StartOfMonth(myDate):
    return addDays(myDate, (-myDate.day+1))


def StartOfYear(myDate):
    from datetime import date
    ydate = date(myDate.year, 1, 1)
    return ydate


def StartOfWeek(myDate):
    return addDays(myDate, (-(myDate.isoweekday()-1)))


def weekBoundaries(year, week):
    from datetime import date
    startOfYear = date(year, 1, 1)
    week0 = startOfYear - timedelta(days=startOfYear.isoweekday())
    sun = week0 + timedelta(weeks=week)
    sat = sun + timedelta(days=6)
    return sun, sat


def EndOfMonth(myDate):
    #Estuve usando esta función y creo que no funciona bien
    return addDays(addMonths(myDate, 1), - myDate.day)
    #return datetime(myDate.year, myDate.month, monthrange(myDate.year, myDate.month)[1])


def EndOfYear(myDate):
    from datetime import date
    ydate = date(myDate.year, 12, 31)
    return ydate


def subdatetime(d1, t1, d2, t2):
    try:
        from datetime import datetime
        dt1 = datetime.combine(d1, t1)
        dt2 = datetime.combine(d2, t2)
        d = dt1 - dt2
        minutes, seconds = divmod(d.seconds, 60)
        hours, minutes = divmod(minutes, 60)
        return d.days * 24 + hours
    except:
        return 0
