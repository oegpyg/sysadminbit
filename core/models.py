from django.db import models
__doc__ = """
Defaults:
Field   Type   Length   unique
Code    char     15      True
Name    char     50      False
"""


class Company(models.Model):
    __doc__ = "This Schema is to multi company management"
    engines = (('PostgresSql', 1),
               )
    Code = models.CharField(max_length=15, unique=True, null=False)
    Name = models.CharField(max_length=50, null=False, blank=False)
    Host = models.IPAddressField(null=False, blank=False)
    Port = models.IntegerField(max_length=4, null=False, blank=False)
    User = models.CharField(max_length=15, null=False, blank=False)
    Password = models.CharField(max_length=50, null=False, blank=False)
    DBName = models.CharField(max_length=15, null=False, blank=False)
    DBEngine = models.IntegerField(choices=engines)


class Computer(models.Model):
    Code = models.CharField(max_length=15, unique=True, null=False)
    Name = models.CharField(max_length=50, null=False, blank=False)
    Office = models.CharField(max_length=15, unique=True, null=False)
    StockDepo = models.CharField(max_length=15, unique=True, null=False)
    Pos = models.CharField(max_length=3, null=False, blank=False)

class OurSettings(models.Model):
    Code = models.CharField(max_length=15, unique=True, null=False)
    Name = models.CharField(max_length=50, null=False, blank=False)
    FantasyName = models.CharField(max_length=50, null=False, blank=False)
    Address = models.CharField(max_length=200, null=True, blank=True)
    City = models.CharField(max_length=15, null=True, blank=True)
    ZipCode = models.CharField(max_length=15, null=True, blank=True)
    Phone = models.CharField(max_length=20, null=True, blank=True)
    Fax = models.CharField(max_length=20, null=True, blank=True)
    Email = models.EmailField(max_length=30, null=True, blank=True)
    WebSite = models.CharField(max_length=30, null=True, blank=True)
    Geo = models.CharField(max_length=50, null=True, blank=True)
    StartDate = models.DateField(null=True)
    LegalInfo = models.CharField(max_length=50, null=True, blank=True)


    def __unicode__(self):
        return "%s - %s" % (self.Code, self.Name)

    def DataSearch(self):
        """:todo: retornar como un gettext"""
        return "Datos de la Empresa"


class Office(models.Model):
    Code = models.CharField(max_length=15, unique=True, null=False)
    Name = models.CharField(max_length=50, null=False, blank=False)
    ShortCode = models.CharField(max_length=5, null=False, blank=False)
    Address = models.CharField(max_length=200, null=True, blank=True)
    City = models.CharField(max_length=15, null=True, blank=True)
    ZipCode = models.CharField(max_length=15, null=True, blank=True)
    Phone = models.CharField(max_length=20, null=True, blank=True)
    Fax = models.CharField(max_length=20, null=True, blank=True)
    Email = models.EmailField(max_length=30, null=True, blank=True)
    Geo = models.CharField(max_length=50, null=True, blank=True)
    StartDate = models.DateField(null=True)
    SalesTarget = models.IntegerField()
    BranchLabel = models.CharField(max_length=15, null=True, blank=True)
    PriceDeal = models.CharField(max_length=15, null=True, blank=True)
    DiscountDeal = models.CharField(max_length=15, null=True, blank=True)
    #To use for Automatic Reposition
    LUN = models.BooleanField(null=True, blank=True)
    MAR = models.BooleanField(null=True, blank=True)
    MIE = models.BooleanField(null=True, blank=True)
    JUE = models.BooleanField(null=True, blank=True)
    VIE = models.BooleanField(null=True, blank=True)
    SAB = models.BooleanField(null=True, blank=True)
    DOM = models.BooleanField(null=True, blank=True)


class AccessGroup(models.Model):
    def number():
        no = AccessGroup.objects.count()
        if no == None:
            return 1
        else:
            return no + 1
    internalId = models.IntegerField(max_length=6, unique=True, default=number)
    Code = models.CharField(max_length="15", unique=True, primary_key=True)
    Name = models.CharField(max_length=50, null=False, blank=False)
    accesstype = (
        (1, 'By Default Without Access'),
        (2, 'By Default With Total Access')
    )
    ModuleAccess = models.IntegerField(max_length=1, choices=accesstype)
    RecordAccess = models.IntegerField(max_length=1, choices=accesstype)
    ReportAccess = models.IntegerField(max_length=1, choices=accesstype)
    RoutineAccess = models.IntegerField(max_length=1, choices=accesstype)


class AccessGroupModuleRow(models.Model):
    __doc__ = "This is for allow or deny privileges to entire Module"
    access = (
        (1, 'Denied'),
        (2, 'Allowed'),
    )
    masterId = models.ForeignKey(AccessGroup, related_name='+')
    Module = models.CharField(max_length="40")
    Access = models.IntegerField(max_length="1", choices=access)


class AccessGroupRecordRow(models.Model):
    __doc__ = """This is for allow or deny access to a Record
    Example: Allow access to Record Item, but not give access to Stock Module
    Another Example: Allow access to Record Invoice but only access to Records of My Office
    """
    access = (
        (1, 'Denied'),
        (2, 'Allowed'),
        (3, 'View Only'),
    )
    visibility = (
        (1, 'Only Record of My Office'),
        (2, 'All Records'),
    )
    masterId = models.ForeignKey(AccessGroup, related_name='+')
    Module = models.CharField(max_length="40")
    Access = models.IntegerField(max_length="1", choices=access)
    Visibility = models.IntegerField(max_length="1", choices=visibility)


class AccessGroupReportRow(models.Model):
    __doc__ = """This is for allow or deny access to a Report
    Example: Allow access to Invoice List but only access to Records of My Office
    Options: Allow view, print and export data
    """
    access = (
        (1, 'Denied'),
        (2, 'View Only'),
        (3, 'View and Print'),
        (4, 'View, Print and Export'),
    )
    visibility = (
        (1, 'Only Record of My Office'),
        (2, 'All Records'),
    )
    masterId = models.ForeignKey(AccessGroup, related_name='+')
    Module = models.CharField(max_length="40")
    Access = models.IntegerField(max_length="1", choices=access)
    Visibility = models.IntegerField(max_length="1", choices=visibility)


class AccessGroupRoutineRow(models.Model):
    __doc__ = "To all routines you need give access one by one"
    access = (
        (1, 'Denied'),
        (2, 'Allowed'),
    )
    masterId = models.ForeignKey(AccessGroup, related_name='+')
    Module = models.CharField(max_length="40")
    Access = models.IntegerField(max_length="1", choices=access)

